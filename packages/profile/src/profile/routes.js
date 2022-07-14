"use strict";

const ProfileRoutes = ($routeProvider, $logProvider) => {
  $logProvider.debugEnabled(true);

  $routeProvider.when(`/profile`, {
    template: '<profile-details data="$resolve.data"></profile-details>',
    resolve: {
      data: [
        "$route",
        "$log",
        "AjaxService",
        ($route, $log, AjaxService) => {
          return AjaxService.getProfile();
        },
      ],
    },
  });
};

export default ProfileRoutes;
