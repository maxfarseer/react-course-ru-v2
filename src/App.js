import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'
// удален импорт newsData
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/newsData.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false, news: data })
        }, 3000)
      })
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    const { news, isLoading } = this.state

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App
