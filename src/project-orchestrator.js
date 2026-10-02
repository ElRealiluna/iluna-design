import { projectQuestions } from './questionnaire/questions.js';
import { QuestionnaireEngine } from './questionnaire/engine.js';
import { DecisionEngine } from './analysis/decision-engine.js';
import { StackRecommender } from './recommendations/stack-recommender.js';
import { MethodologyRecommender } from './recommendations/methodology-recommender.js';
import { RecommendationReport } from './recommendations/report-generator.js';

/**
 * Project Orchestrator: Intake -> Analysis -> Recommendation
 */
export class ProjectOrchestrator {
  constructor() {
    this.questionnaire = new QuestionnaireEngine(projectQuestions);
    this.decisionEngine = new DecisionEngine();
    this.stackRecommender = new StackRecommender();
    this.methodologyRecommender = new MethodologyRecommender();
  }

  /**
   * Start project intake process
   */
  startIntake() {
    return {
      stage: 'intake',
      message: 'Bienvenido al Project Orchestrator. Responde estas preguntas para una recomendación personalizada.',
      progress: this.questionnaire.getProgress(),
      currentQuestion: this.questionnaire.getNextQuestion()
    };
  }

  /**
   * Process user answer
   */
  answerQuestion(questionId, answer) {
    const result = this.questionnaire.recordAnswer(questionId, answer);

    if (this.questionnaire.isComplete()) {
      return this.generateRecommendation();
    }

    return {
      stage: 'questionnaire',
      message: 'Pregunta registrada',
      progress: result.progress,
      nextQuestion: result.nextQuestion
    };
  }

  /**
   * Generate full recommendation after all questions answered
   */
  generateRecommendation() {
    const answers = this.questionnaire.getAnswers();

    // Analysis
    const profile = this.decisionEngine.analyze(answers);

    // Stack recommendation
    const stackRec = this.stackRecommender.recommend(profile);

    // Methodology recommendation
    const methodologyRec = this.methodologyRecommender.recommend(profile);

    // Generate report
    const report = new RecommendationReport(profile, stackRec, methodologyRec);

    return {
      stage: 'recommendation',
      report: report.generate(),
      readyToProceed: true,
      nextAction: 'Validar recomendación o ajustar parameters'
    };
  }

  /**
   * Get current state
   */
  getState() {
    return {
      stage: this.questionnaire.currentPhase,
      progress: this.questionnaire.getProgress(),
      answers: this.questionnaire.getAnswers()
    };
  }
}

export { projectQuestions, QuestionnaireEngine, DecisionEngine, StackRecommender, MethodologyRecommender, RecommendationReport };
