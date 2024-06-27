const fs = require('fs');
const path = require('path');

// Path to the JSON file
const rulesFilePath = path.join(__dirname, '../db/rules.json');

// Helper function to read rules from the file
const readRulesFromFile = () => {
  try {
    const data = fs.readFileSync(rulesFilePath, 'utf8');
    const rules = JSON.parse(data);
    return Array.isArray(rules) ? rules : [];
  } catch (error) {
    return []; // Return an empty array if file doesn't exist or is empty
  }
};

// Helper function to write rules to the file
const writeRulesToFile = (rules) => {
  fs.writeFileSync(rulesFilePath, JSON.stringify(rules, null, 2));
};

// Function to generate a random number for the ID
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

// Controller functions
const getRules = (req, res) => {
  const rules = readRulesFromFile();
  res.json(rules);
};

const addOrUpdateIp = (req, res) => {
  const { RuleName, ip, id } = req.body;
  if (!RuleName || !ip) {
    return res.status(400).json({ error: 'RuleName and ip are required' });
  }

  const rules = readRulesFromFile();
  let rule;

  if (id) {
    const existingRuleIndex = rules.findIndex(rule => rule.id === id);

    if (existingRuleIndex >= 0) {
      rules[existingRuleIndex] = { RuleName, ip, id };
      rule = rules[existingRuleIndex];
    } else {
      return res.status(404).json({ error: 'Rule not found' });
    }
  } else {
    rule = { RuleName, ip, id: generateRandomId() };
    rules.push(rule);
  }

  writeRulesToFile(rules);
  res.json({ message: 'Rule added/updated successfully', rule });
};

const deleteRule = (req, res) => {
  const { id } = req.params;
  const rules = readRulesFromFile();
  const newRules = rules.filter(rule => rule.id !== id);

  if (newRules.length === rules.length) {
    return res.status(404).json({ error: 'Rule not found' });
  }

  writeRulesToFile(newRules);
  res.json({ message: 'Rule deleted successfully' });
};

module.exports = {
  getRules,
  addOrUpdateIp,
  deleteRule,
};
