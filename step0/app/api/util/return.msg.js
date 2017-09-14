// 200 - success
exports.success200 = res => res.status(200).json({});

// 200 - return Model
exports.success200RetObj = (res, obj) => {
  res.body = JSON.stringify(obj);
  return res.status(200).json(obj);
};

// 201 - create
exports.success201 = res => res.status(201).json({});

// 201 - return Model
exports.success201RetObj = (res, obj) => {
  res.body = JSON.stringify(obj);
  return res.status(201).json(obj);
};

// 204 - delete
exports.success204 = res => res.status(204).send();