const core = require('@actions/core')

exports.getIdentifier = (identifier, raw) => {
  var single = new RegExp('\\W+(' + `${identifier}` + ')$')
  var multi = new RegExp('\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$')

  switch (identifier.length){
    case 0: 
      return ''
      break;
    case 1:
      return raw.slice(raw.search(single), raw.length)
      break;
    default:
      return raw.slice(raw.search(multi), raw.length)
  }
}

exports.getInputBoolean = (input) => {
  let boolTest = RegExp('true', 'i')
  return boolTest.test(input)
}

exports.conditionalTagFilter = (tag) => {
  const isConditionalTag = /(?<strategy>.*)::'?(?<include>true|false)/i
  
  // tag has condition specified, so only return 
  //the tag if the condition is true
  if(isConditionalTag.test(tag)){
    let {groups} = tag.match(isConditionalTag)
    if(groups.include == ('true'||true)) {
      console.log('returning conditional strategy that resolved to true', groups.strategy)
      return groups.strategy
    } else {
      return false
    }
  } 

  return tag
}

exports.getInputList = (list) => {
    if (list.length < 1) {
      return []
    }

    return list
      .split(/\r?\n/)
      .filter(x => x)
      .reduce((acc, line) => acc.concat(line.split(',').filter(x => x)).map(pat => pat.trim()), [])
}
