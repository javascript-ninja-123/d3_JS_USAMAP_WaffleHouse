const width = 700;
const height = 700;



// var income_domain = [36000, 36101, 36102, 36015, 36107, 36235, 36255, 36321, 36345]
// var income_color = d3.scaleThreshold()
//     .domain(income_domain)
//     .range(d3.schemeGreens[7]);

const svg = d3.select('#usMap')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(responsivefy)
    .append('g')

const usMap = d3.map()

d3.queue()
    .defer(d3.json, 'https://raw.githubusercontent.com/jgoodall/us-maps/master/topojson/state.topo.json')
    .defer(d3.csv, 'https://raw.githubusercontent.com/minh5/wafflehouse/master/webscraping/geoWaffles.csv')
    .await(ready)


function ready(err, data, waffle) {
    try {

        var usa = topojson.feature(data, data.objects.state).features;


        var projection = d3.geoAlbersUsa()
            .translate([width / 2, height / 2 - 100])
            .scale(600)


        var path = d3.geoPath()
            .projection(projection)


        var group = svg
            .selectAll('g')
            .data(usa)
            .enter()
            .append('g')
            .append('path')
            .attr('d', path)

        // aa = [-122.490402, 37.786453];
        // bb = [-122.389809, 37.72728];

        // let newMC = mc.map(d => {
        //     return ([Number(d['-149.858384']), Number(d['61.21755'])])
        // })

        // svg.selectAll("circle")
        //     .data([aa, bb]).enter()
        //     .append("circle")
        //     .attr("cx", function(d) { console.log(projection(d)); return projection(d)[0]; })
        //     .attr("cy", function(d) { return projection(d)[1]; })
        //     .attr("r", "8px")
        //     .attr("fill", "red")

        var mcdo = svg.selectAll('.waffle')
            .data(waffle)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d => {

                let coords = projection([d.lngs, d.lats])
                return coords[0]
            })
            .attr('cy', d => {
                let coords = projection([d.lngs, d.lats])

                return coords[1]
            })


    } catch (err) {
        console.log(err)
    }
}