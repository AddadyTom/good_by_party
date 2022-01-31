import React, { Component } from 'react';
import Quiz from './components/Quiz';
import logo from './svg/1_vs_100.jpg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      question: '',
      answerOptions: [],
      answersCount: {},
    };
    this.total_amount_of_questions = 1620;
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    console.log("componentWillMount")
    fetch("http://localhost:8081/questions/amount")
      .then(amount_data => amount_data.json())
      .then(
        (amount) => { 
              this.total_amount_of_questions = amount;
            });
    console.log(this.total_amount_of_questions)
  }


  componentDidMount() {
    console.log("componentDidMount")
    console.log(this.total_amount_of_questions)
    this.setNextQuestion()
  }

  handleAnswerSelected(event) {
    // this.setUserAnswer(event.currentTarget.value);

    if (this.state.counter < this.total_amount_of_questions) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      console.log("FINISHED! ")
      setTimeout(() => this.setNextQuestion(), 300);
    }
  }

  setNextQuestion() {

    fetch("http://localhost:8081/questions/current")
      .then(question_data => question_data.json())
      .then(
        (current_question) => {
          console.log(current_question);
          this.setState({
            counter: current_question.current_index,
            question: current_question.question,
            answerOptions: current_question.answers,
          });
        },
        (error) => {console.log(error)})
  }

  renderQuiz() {
    return (
      <Quiz
        answerOptions={this.state.answerOptions}
        questionId={this.state.counter}
        question={this.state.question}
        questionTotal={this.total_amount_of_questions}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="150px"/>
          <h2>Bye Bye Regev :)</h2>
        </div>
        {this.renderQuiz()}
      </div>
    );
  }
}

export default App;
