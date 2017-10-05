/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue("Generating minified bundle for production. Stand by..."));


webpack(webpackConfig).run((err, stats) => {
    if (err){//so a fatal error occured. Stop Here
        console.log(chalk.red(err));
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if(jsonStats.hasWarnings){
        console.log(chalk.yellow('Webpack generated the following warnings:'));
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    //if we got this far, great success
    console.log(chalk.green("App has been built for production and been written to /dist. Have a nice day : )"));

    return 0;
});
