const toolRegistry = require('../data/tools');
const { successResponse, notFoundResponse } = require('../utils/response');

function getAllTools(req, res) {
  const { category, featured } = req.query;

  let tools = toolRegistry.getAll();

  if (category) {
    tools = toolRegistry.getByCategory(category);
  }

  if (featured === 'true') {
    tools = tools.filter((t) => t.featured || t.popular);
  }

  return successResponse(res, {
    tools,
    count: tools.length,
  });
}

function getToolBySlug(req, res) {
  const { slug } = req.params;
  const tool = toolRegistry.getBySlug(slug);

  if (!tool) {
    return notFoundResponse(res, `Tool with slug "${slug}" was not found in the registry.`);
  }

  return successResponse(res, { tool });
}

module.exports = { getAllTools, getToolBySlug };
