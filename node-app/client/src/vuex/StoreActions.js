import _ from 'lodash';

function StoreActions(api, module) {
  module.actions = module.actions || {};
  this.api = _.assign({}, api);
  this.actions = module.actions;
}
StoreActions.prototype.init = function() {
  const keys = Object.keys(this.api);
  const self = this;
  _.each(keys, key => {
    this.actions[key] = ({ commit }, formData) =>
        self.getAPIPromise(key, formData)
  });
}
StoreActions.prototype.getAPIPromise = function(funName, formData) {
  return new Promise((resolve, reject) => {
    this.api[funName](formData).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  });
};
export default StoreActions;