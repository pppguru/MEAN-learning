//@flow
"use strict";

import Exam from 'examinations/models/Examination';
import CategoryService from 'categories/service/CategoryService';
import buildStrategies from '../strategies/building';
import type { Category } from 'categories/models/Category';
import ExaminationTemplate from 'examinations/templates/ExaminationTemplate';

const itemCounts = {
  micro: 8,
  short: 40,
  normal: 60,
  long: 100
};

async function loadCategories() {
  const general = await CategoryService.find({
    name: 'General Medical'
  });
  const random = await CategoryService.random(3);
  return random.add(general.models);
}

function buildCategoryConstraints(categories: Array<Category>): Array<Object> {
  return categories.map((category) => {
    const weight = category.get('name') === 'General Medical' ? .4 : .2;
    return { type: 'Category', category, weight };
  });
}


export default async ({ type }: Object, userId: String) => {
  const categories = await loadCategories();
  const constraints = buildCategoryConstraints(categories);
  const template = new ExaminationTemplate(itemCounts[type], categories, constraints);

  template.addSection({
    type: 'Multiple Choice Spanish',
    weight: 0.25
  });

  template.addSection({
    type: 'Multiple Choice English',
    weight: 0.25
  });

  template.addSection({
    type: 'Category Matching',
    weight: 0.25
  });

  template.addSection({
    type: 'Term Matching',
    weight: 0.25
  });

  await Promise.all(template.sections.map(section => {
    const strategy = buildStrategies[section.type];
    return strategy(section);
  }));

  return Exam.fromTemplate(template, userId);
};
