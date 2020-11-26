const SitemapGenerator = require('sitemap-generator');
const args = require('args');

args.option('stripQuery', 'Strip query..').option('url', 'The url of the target');

const flags = args.parse(process.argv);

if (flags.url) {
    runGenerator(flags.url, flags.stripQuery);
} else {
    console.error('You need to specify --url');
    process.exit(1);
}

function runGenerator(url, stripQuery) {
    const generator = SitemapGenerator(url, {
        stripQuerystring: !!stripQuery
    });

    generator.on('done', () => {
        console.log('Sitemap Generator completed');
        process.exit(0);
    });

    generator.on('add', (url) => {
        console.log(url);
    });

    generator.start();
}
