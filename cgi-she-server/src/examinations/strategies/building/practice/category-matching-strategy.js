//@flow
import Term from 'terminology/models/Term';
import ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import CategoryMatchingQuestionTemplate from 'examinations/templates/questions/CategoryMatchingQuestionTemplate';

const distributeTermsAndCategorysForQuestions = (categoriesWithTerms: Array<any>, questionCount: number) => {
  const termGroupings = [];
  let numGroupsToBuild = questionCount;
  while(numGroupsToBuild > 0) {
    const distribution = categoriesWithTerms.reduce((accumulator, {terms, category}) => {
      const item = { terms: terms.models.splice(-(1), 1), category };
      return accumulator.concat(item);
    }, []);
    termGroupings.push(distribution);
    numGroupsToBuild--;
  }
  return termGroupings;
};

function buildQuestion(termGrouping, section) {
  const question = new CategoryMatchingQuestionTemplate(section);
  termGrouping.forEach(({terms, category}) => {
    terms.forEach(term => {
      question.addTerm(term);
      question.addCorrectResponseForTerm(term, category);
      question.addCategoriesForTerm(category);
    });
  });
  return question;
}

export default async (section: ExamSectionTemplate) => {
  const { categoriesCovered } = section.exam;

  const groupings = await Promise.all(categoriesCovered.map((category => {
    return Term.query(query => {
      query.join('categories_terms', 'terms.id', 'categories_terms.term_id');
      query.join('categories', 'categories.id', 'categories_terms.category_id');
      query.join('languages', 'terms.language_id', 'languages.id');
      query.where('languages.name', '=', 'Spanish');
      query.where('categories.id', '=', category.get('id'));
      query.limit(Math.ceil(section.itemCount / categoriesCovered.length));
    })
    .fetchAll()
    .then(terms => ({ terms, category }));
  })));

  const termGroupings = distributeTermsAndCategorysForQuestions(groupings, section.itemCount);

  const questions = termGroupings.map(termGroup => buildQuestion(termGroup, section));
  section.addQuestions(questions);
  return section;
};
