export class QuestionnaireEngine {
  constructor(questions) {
    this.questions = questions;
    this.answers = {};
    this.currentPhase = 'intake';
  }

  getCurrentPhaseQuestions() {
    return this.questions[this.currentPhase] || [];
  }

  getNextQuestion() {
    const phaseQuestions = this.getCurrentPhaseQuestions();
    const answered = Object.keys(this.answers).length;
    
    if (answered >= phaseQuestions.length) {
      return this.moveToNextPhase();
    }

    return phaseQuestions[answered];
  }

  moveToNextPhase() {
    const phases = ['intake', 'requirements', 'constraints', 'success'];
    const currentIndex = phases.indexOf(this.currentPhase);

    if (currentIndex < phases.length - 1) {
      this.currentPhase = phases[currentIndex + 1];
      return this.getCurrentPhaseQuestions()[0];
    }

    return null; // All questions answered
  }

  recordAnswer(questionId, answer) {
    this.answers[questionId] = answer;
    return {
      success: true,
      progress: this.getProgress(),
      nextQuestion: this.getNextQuestion()
    };
  }

  getProgress() {
    const phases = ['intake', 'requirements', 'constraints', 'success'];
    const totalQuestions = Object.values(this.questions).reduce((sum, phase) => sum + phase.length, 0);
    const answered = Object.keys(this.answers).length;
    return {
      answered,
      total: totalQuestions,
      percentage: Math.round((answered / totalQuestions) * 100),
      phase: this.currentPhase
    };
  }

  getAnswers() {
    return this.answers;
  }

  isComplete() {
    const phases = ['intake', 'requirements', 'constraints', 'success'];
    return this.currentPhase === phases[phases.length - 1] && this.getNextQuestion() === null;
  }
}
