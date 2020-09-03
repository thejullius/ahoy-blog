var source = "site_impulso";
  var impulser_visit = "impulser_blog_visit";
  var ahoy_url = "https://staging.api.impulso.network";

  var Cookies = {
    set: function () {
      var expires = "; expires=" + moment().endOf("day").toDate().toUTCString();
      document.cookie =
        impulser_visit +
        "=" +
        moment().toDate().toUTCString() +
        expires +
        "; path=/";
    },
    get: function (name) {
      var i, c;
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return unescape(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
  };

  ahoy.configure({
    urlPrefix: "",
    visitsUrl: ahoy_url + "/ahoy/visits",
    eventsUrl: ahoy_url + "/ahoy/events",
    page: null,
    platform: "Web",
    useBeacon: false,
    startOnReady: true,
    trackVisits: true,
    cookies: true,
    cookieDomain: "impulso.network",
    headers: {
      "Ahoy-Visit": ahoy.getVisitId(),
      "Ahoy-Visitor": ahoy.getVisitorId(),
    },
    visitParams: {},
    withCredentials: false,
    visitDuration: 30 * 24 * 60,
    visitorDuration: 30 * 24 * 60,
  });

  function setVisit() {
    var currentVisit = Cookies.get(impulser_visit);
    if (currentVisit) return;
    Cookies.set();
    ahoy.track("site_visit", { source });
  }

  if (Cookies.get("iapp_token")) {
    setVisit();
    ahoy.trackView({ source });
  }
