import { expect } from 'chai';
import { stub, spy } from 'sinon';
import * as validations from './../../validations';
import User from '../User';
import bcrypt from 'bcrypt';

let attributes = {
  id: '123-ksd-192kd-29kd',
  firstName: 'Joe',
  lastName: 'Shmoe',
  email: 'joe@nowhere.net',
  password: 'secret',
  passwordConfirmation: 'password',
  passwordHash: 'hash'
};

describe('User data model', () => {

  describe('sanitizing the models attributes', () => {
    let result;
    before(() => {
      result = new User(attributes).sanitize();
    });
    it('returns back and object containing only the id, firstName, lastName, and email', () => {
      const { id, firstName, lastName, email } = attributes;
      expect(result).to.eql({id, firstName, lastName, email});
    });
  });

  describe('generating a cryptographic salt and hashing the password', () => {

    before(() => {
      stub(bcrypt, 'genSaltSync').returns('salt');
      stub(bcrypt, 'hashSync').returns('hash');
    });

    after(() => {
      bcrypt.genSaltSync.restore();
      bcrypt.hashSync.restore();
    });

    describe('when the model is new', () => {
      let user;

      before(() => {
        user = new User();
        user.hashPassword();
      });

      it('hashes the password', () => {
        expect(user.get('passwordHash')).to.be.defined;
      });

    });

    describe('when the model is not new or the hash already exists', () => {
      let user;

      before(() => {
        user = new User();
        user.isNew = stub().returns(false);
        user.isHashed = stub().returns(true);
        user.hashPassword();
      });

      it('does not generate a password hash', () => {
        expect(user.get('passwordHash')).to.be.undefined;
      });

    });

  });

  describe('validation', () => {
    let user;

    before(() => {
      user = new User();
      stub(validations, 'EmailAddress');
      stub(validations, 'PasswordComplexity');
      stub(validations, 'PasswordsMatch');
      user.validate();
    });

    it('validates the email address', () => {
      expect(validations.EmailAddress).to.have.been.calledWith(user.attributes);
    });

    it("validates the password's complexity", () => {
      expect(validations.PasswordComplexity).to.have.been.calledWith(user.attributes);
    });

    it('validates that the password and confirmation match', () => {
      expect(validations.PasswordsMatch).to.have.been.calledWith(user.attributes);
    });

  });

  describe('before the model is saved', () => {
    let user;

    before(() => {
      user = new User({ password: 'Password'});
      user.setUUID = spy();
      user.validate = spy();
      user.hashPassword = spy();
      user.trigger('saving');
    });

    it('validates the models attributes', () => {
      expect(user.validate).to.have.been.called;
    });

    it('hashes the password and generates the salt', () => {
      expect(user.hashPassword).to.have.been.called;
    });

  });

  describe('checking for a permission', () => {
    let user = new User(),
      query;

    beforeEach(() => {
      user.relations.role = { get: stub().returns('0asd-asdase-9asweeops') };
      query = { from: () => {} };
    });


    describe('it has been granted', () => {
      const validPermissions = [{permission: 'urn:cgi:permission:users::list'}];

      beforeEach(() => {
        stub(user.orm.knex, 'select').returns(query);
        stub(query, 'from').returns(Promise.resolve(validPermissions));
      });

      afterEach(() => { user.orm.knex.select.restore(); });

      it('returns true', async () => {
        expect(await user.hasPermission('urn:cgi:permission:users::list')).to.equal(true);
      });
    });

    describe('it has not been granted', () => {
      const invalidPermissions = [{ permission: 'urn:cgi:permission:users::create'}];

      beforeEach(() => {
        stub(user.orm.knex, 'select').returns(query);
        stub(query, 'from').returns(Promise.resolve(invalidPermissions));
      });

      afterEach(() => { user.orm.knex.select.restore(); });

      it('returns false', async () => {
        expect(await user.hasPermission('urn:cgi:permission:users::list')).to.equal(false);
      });
    });
  });
});
