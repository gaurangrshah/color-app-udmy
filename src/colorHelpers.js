import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
function getRange(hexColor) {
  const end = "#fff";
  // console.log(`getting scale range`);
  return [
    chroma(hexColor)
      .darken(1.4) // uses provided color and darkens 1.4
      // to provide the dark end of the spectrum,
      // usng black creates too many darker tones
      .hex(), // returns the darkened version of the provided hexColor
    hexColor,
    end
  ];
}
function getScale(hexColor, numberOfColors) {
  // return a scale of 10 colors based on the provided input color.
  // console.log(`getting scale colors`, hexColor, numberOfColors);
  let cScale = chroma
    .scale(getRange(hexColor))
    // get range provides the
    .mode("lab")
    // lab = lightness A = B
    .colors(numberOfColors);
  // number of colors to be returne ds the scale.
  // console.log("cScale", cScale);
  return cScale;
}

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };
  // traverse the levels array
  for (let level of levels) {
    // create an empty array for each level on the colors property of newPalette.
    newPalette.colors[level] = [];
  }

  for (let color of starterPalette.colors) {
    // console.log(color);
    let scale = getScale(color.color, 10);
    scale = scale.reverse();
    // console.log("scale", scale);
    // sets the scale with 10 colors using the provided color, and reverses order to match our original [levels] array.
    for (let i in scale) {
      // for each of the ten colors in the scale"
      newPalette.colors[levels[i]].push({
        // push the color name"
        name: `${color.name} ${levels[i]}`,
        // creates the id for the color name with provided regex pattern
        id: color.name.toLowerCase().replace(/ /g, "-"), // regex pattern replaces spaces in our id with a dash
        // sets the hex value of scale at the index provided
        hex: scale[i],
        // convets the hex to rgb:
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          // hack rgb value to add the alpha channel value for rgba.
          .replace("rgb", "rgba")
          .replace(")", ",1.0)")
      });
    }
  }
  // console.log("newPalette", newPalette);
  return newPalette;
}

export { generatePalette };
