import { createSlice } from '@reduxjs/toolkit'

const help = `Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Selcuk Coskun](github.com/slckcskn)*`

export const markdownSlice = createSlice({
  name: 'markdown',
  initialState: {
    text : '# Hello, Markdown',
    userText: '',
    isHelp: false
  },
  reducers: {
    inputText: (state, action) => {
        state.text = action.payload
        state.userText = action.payload
    },
    toggleHelp: (state, action) => {
        state.isHelp = !state.isHelp;
        console.log(state.isHelp)
        if(state.isHelp) {
            state.userText = state.text;
            state.text = help;
        } else {
            state.text = state.userText;
        }
    }
  }
})

export const { inputText, toggleHelp } = markdownSlice.actions

export default markdownSlice.reducer
