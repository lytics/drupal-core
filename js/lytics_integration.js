(function (Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.lyticsBehavior = {
    attach: function (context, settings) {

      const lyticsSrc = drupalSettings?.lytics?.src;

      !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
      //  Define config and initialize Lytics tracking tag.
      // - The setup below will disable the automatic sending of Page Analysis Information (to prevent duplicative sends, as this same information will be included in the jstag.pageView() call below, by default)
      // src: 'https://c.lytics.io/api/tag/f7c82744ddda883c8754e03cdbdbd446/latest.min.js',
      if (lyticsSrc) {
        jstag.init({
          src: lyticsSrc,
          pageAnalysis: {
            dataLayerPull: {
              disabled: true
            }
          }
        });

        // You may need to send a page view, depending on your use-case
        jstag.pageView();
      }
    }
  };

})(Drupal, drupalSettings);
