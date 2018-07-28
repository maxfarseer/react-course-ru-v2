import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'
import newsData from './data/newsData'
import './App.css'

class App extends React.Component {
  state = {
    news: newsData,
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </React.Fragment>
    )
  }
}

export default App
