/**
 * Custom angular webpack configuration
 */

 module.exports = (config, options) => {
    if (config.optimization.minimizer[2]) {
        config.optimization.minimizer[2].options.terserOptions.keep_classnames = true;    
        config.optimization.minimizer[2].options.terserOptions.keep_fnames = true;
    }

    config.target = 'electron-renderer';

    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

    return config;
}