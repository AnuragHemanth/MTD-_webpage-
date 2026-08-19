const createSequentialId = async (Model, field, prefix) => {
  const existing = await Model.find({ [field]: new RegExp(`^${prefix}\\d+$`) })
    .select(field)
    .lean();

  const nextNumber = existing.reduce((highest, record) => {
    const match = String(record[field] || '').match(/(\d+)$/);
    return Math.max(highest, match ? Number(match[1]) : 0);
  }, 0) + 1;

  return `${prefix}${nextNumber}`;
};

module.exports = { createSequentialId };