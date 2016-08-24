/**
 * Created by lxy on 16/8/22.
 */
import Webpack_isomorphic_tools_plugin from 'webpack-isomorphic-tools/plugin';
export default {
    debug: true,
    assets: {
        images: {
            extensions: ['png', 'jpg', 'git', 'ico'],
            parser: Webpack_isomorphic_tools_plugin.url_loader_parser
        },
        font: {
            extensions: ['woff','svg','eot','ttf'],
            parser: Webpack_isomorphic_tools_plugin.url_loader_parser
        },
        style_modules: {
            extensions: ['css','scss'],
            //filter: function (module,regex,options,log) {
            //    if (options.development) {
            //        return Webpack_isomorphic_tools_plugin.style_loader_filter(module,regex,options,log);
            //    }
            //    return regex.test(module.name);
            //},
            //path: function (module,options,log) {
            //    if (options.development) {
            //        return Webpack_isomorphic_tools_plugin.style_loader_path_extractor(module,options,log);
            //    }
            //    return options.project_path + module.name;
            //},
            //parser: function (module,options,log) {
            //    if (options.development) {
            //        return Webpack_isomorphic_tools_plugin.css_modules_loader_parser(module,options,log);
            //    }
            //    return module.source;
            //}
        }
    }
}