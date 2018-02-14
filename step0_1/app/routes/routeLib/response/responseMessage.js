// 200 - success
exports.success200 = res => res.status(200).send();

// 200 - return Model
exports.success200RetObj = (res, obj) => res.status(200).json(obj);

// 201 - create
exports.success201 = res => res.status(201).send();

// 201 - return Model
exports.success201RetObj = (res, obj) => res.status(201).json(obj);

// 201 - response JSON with Token
exports.success201RetObjWithToken = (res, accessToken, obj = {}) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true
  });

  this.success201RetObj(obj);
};

// 204 - delete
exports.success204 = res => res.status(204).send();

// 204 - Token Clear
exports.tokenClear = res => {
  res.clearCookie('accessToken');
  this.success204(res);
};
