function parse(data) { 
  let output = []
  for (let i = 0; i < data.length; i++) { 
    output.push(JSON.parse(data[i]))
  }
  console.log(output);
}

module.exports= { parse }