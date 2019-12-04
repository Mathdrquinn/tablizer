import * as React from 'react';

type Delimiter = 'comma' | 'comma space' | 'tab' | 'space' | 'newline';
type Recurrance = 'instance' | 'repeating';

export interface ITablizerProps {
}

export interface ITablizerState {
  text: string;
  textDelimiter: Delimiter;
  prependText: string;
  prependTextDelimiter: Delimiter;
  prependTextType: Recurrance;
  appendText: string;
  appendTextDelimiter: Delimiter;
  appendTextType: Recurrance;
}

export default class Tablizer extends React.Component<ITablizerProps, ITablizerState> {
  state: ITablizerState = {
    text: 'this, is, the, beginning, of, a, very, simple, app',
    textDelimiter: 'comma space',
    prependText: '1, 2',
    prependTextDelimiter: 'comma space',
    prependTextType: 'repeating',
    appendText: 'a, b, c',
    appendTextDelimiter: 'comma space',
    appendTextType: 'repeating'
  };

  updateText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    return this.setState({ text: e.currentTarget.value })
  }

  updateTextDelimeter = (d: Delimiter): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    return this.setState({ textDelimiter: d })
  }

  updateAppendText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    return this.setState({ appendText: e.currentTarget.value })
  }

  updateAppendTextDelimiter = (d: Delimiter): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    return this.setState({ appendTextDelimiter: d })
  }

  updatePrependText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    return this.setState({ prependText: e.currentTarget.value })
  }

  updatePrependTextDelimiter = (d: Delimiter): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    return this.setState({ prependTextDelimiter: d })
  }

  static getDelimiter(d: Delimiter) {
    switch (d) {
      case 'comma': {
        return ','
      }
      case 'comma space': {
        return ', '
      }
      case 'tab': {
        return '\t'
      }
      case 'space': {
        return ' '
      }
      case 'newline': {
        return '\n'
      }
      default: {
        return ', '
      }
    }
  }

  public render() {
    return (
      <>
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Main Data</legend>
            <label>Paste text here:
              <br />
              <textarea onChange={this.updateText} value={this.state.text}></textarea>
            </label>
            <label>Select delimiter:
            <button type="button" onClick={this.updateTextDelimeter('comma')} disabled={this.state.textDelimiter === 'comma'}>Comma</button>
              <button type="button" onClick={this.updateTextDelimeter('comma space')} disabled={this.state.textDelimiter === 'comma space'}>Comma with space</button>
              <button type="button" onClick={this.updateTextDelimeter('tab')} disabled={this.state.textDelimiter === 'tab'}>Tab</button>
              <button type="button" onClick={this.updateTextDelimeter('space')} disabled={this.state.textDelimiter === 'space'}>Space</button>
              <button type="button" onClick={this.updateTextDelimeter('newline')} disabled={this.state.textDelimiter === 'newline'}>NewLine</button>
            </label>
          </fieldset>
          <fieldset>
            <legend>Prepend Data</legend>
            <label>Prepend:
              <br />
              <textarea onChange={this.updatePrependText} value={this.state.prependText}></textarea>
            </label>
            <label>Select delimiter:
            <button type="button" onClick={this.updatePrependTextDelimiter('comma')} disabled={this.state.prependTextDelimiter === 'comma'}>Comma</button>
              <button type="button" onClick={this.updatePrependTextDelimiter('comma space')} disabled={this.state.prependTextDelimiter === 'comma space'}>Comma with space</button>
              <button type="button" onClick={this.updatePrependTextDelimiter('tab')} disabled={this.state.prependTextDelimiter === 'tab'}>Tab</button>
              <button type="button" onClick={this.updatePrependTextDelimiter('space')} disabled={this.state.prependTextDelimiter === 'space'}>Space</button>
              <button type="button" onClick={this.updatePrependTextDelimiter('newline')} disabled={this.state.prependTextDelimiter === 'newline'}>NewLine</button>
            </label>
          </fieldset>
          <fieldset>
            <legend>Append Data</legend>
            <label>Append:
              <br />
              <textarea onChange={this.updateAppendText} value={this.state.appendText}></textarea>
            </label>
            <label>Select delimiter:
            <button type="button" onClick={this.updateAppendTextDelimiter('comma')} disabled={this.state.appendTextDelimiter === 'comma'}>Comma</button>
              <button type="button" onClick={this.updateAppendTextDelimiter('comma space')} disabled={this.state.appendTextDelimiter === 'comma space'}>Comma with space</button>
              <button type="button" onClick={this.updateAppendTextDelimiter('tab')} disabled={this.state.appendTextDelimiter === 'tab'}>Tab</button>
              <button type="button" onClick={this.updateAppendTextDelimiter('space')} disabled={this.state.appendTextDelimiter === 'space'}>Space</button>
              <button type="button" onClick={this.updateAppendTextDelimiter('newline')} disabled={this.state.appendTextDelimiter === 'newline'}>NewLine</button>
            </label>
          </fieldset>
        </form>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {this.state.text.split(Tablizer.getDelimiter(this.state.textDelimiter)).map((data, i, dataArray) => {
              const prependDataList = this.state.prependText === '' ? null : this.state.prependText.split(Tablizer.getDelimiter(this.state.prependTextDelimiter));
              const prependData = prependDataList && prependDataList.slice(i % prependDataList.length, (i % prependDataList.length) + 1);

              const appendDataList = this.state.appendText === '' ? null : this.state.appendText.split(Tablizer.getDelimiter(this.state.appendTextDelimiter));
              const appendData = appendDataList && appendDataList.slice(i % appendDataList.length, (i % appendDataList.length) + 1);

              return (
                <tr key={i + data}>
                  {prependData ? (<td>{prependData}</td>) : null}
                  <td>{data}</td>
                  {appendData ? (<td>{appendData}</td>) : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  }
}
