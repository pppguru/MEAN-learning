import Orm from '../../data/orm';
import Base from './../../common/models/Base';
import User from './User';



const tableName = 'telephones';
const persistenceWhitelist = ['countryCode', 'areaCode', 'number', 'extension', 'userId'];

const Telephone = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  getForeignKeys() {
    return ['user_id'];
  },

  user() {
    return this.belongsTo(User);
  },

  serialize() {
    const { id, countryCode, areaCode, number, extension, type } = this.attributes;

    return {
      id,
      countryCode,
      areaCode,
      number,
      extension,
      type
    };
  },

  validate() {}
});

export default Orm.model('Telephone', Telephone);
