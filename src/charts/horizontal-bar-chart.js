import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Bar = ({ data, width = 600, height = 600 }) => {
  const barChart = useRef();

  useEffect(() => {
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - 2 * margin.bottom;
    // Define scale ordinal - discrete
    const colors = d3.scaleOrdinal([
      "#ffa822",
      "#134e6f",
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
    ]);

    const svg = d3
      .select(barChart.current)
      .attr("width", width)
      .attr("height", height)

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.bottom})`);

    var x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.count;
        }),
      ])
      .range([0, iwidth]);

    var y = d3
      .scaleBand()
      .domain(data.map((d) => d.item))
      .range([iheight, 0])
      .padding(0.1);

    var bars = g.selectAll("rect").data(data);

    // Tooltip
    const tooldiv = d3
      .select("#chartArea")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background-color", "gray");

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", (d, i) => colors(i))
      .attr("x", 0)
      .attr("y", (d) => y(d.item))
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.count))
      .on("mouseover", (e, d) => {
        console.log(e);
        console.log(d);

        tooldiv
          .style("visibility", "visible")
          .text(`${d.item}:` + `${d.count}`);
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

     
  });
  

  return (
    <div id="chartArea">
      <svg ref={barChart}></svg>
    </div>
  );
};

export default Bar;
