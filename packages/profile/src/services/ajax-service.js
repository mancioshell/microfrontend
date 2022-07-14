const AjaxService = ($q, $log) => {
  return {
    async getProfile() {
      const utils = await import("utils/AjaxService");
      const result = await utils.doAjax("GET", "/api/users/1");
      return result.data;
    },
  };
};

export default AjaxService;
