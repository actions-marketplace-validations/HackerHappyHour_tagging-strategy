const core = require('@actions/core')
const {taggingStrategy} = require('./src/taggingStrategy')
const {getInputBoolean} = require('./src/utils')

const inputTags = core.getInput('tags')
const tagName = core.getInput('tag_name')
const latest = getInputBoolean(core.getInput('latest') || 'false')
const imageName = core.getInput('image_name')
const extraTags = core.getInput('extra_tags') || false

try {
  core.setOutput('tags', taggingStrategy({inputTags, tagName, latest, imageName, extraTags}))
} catch (error) {
  core.error(error)
  core.setFailed(`tagging-strategy was unable to parse your tags...\n${error}`)
}
