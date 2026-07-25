export class DashboardController {
  constructor(getDashboardSummaryUseCase) {
    this.getSummary = async (request, response) => {
      try {
        const summary = await getDashboardSummaryUseCase.execute(request.auth.sub);
        return response.status(200).json(summary);
      } catch (error) {
        console.error('Dashboard summary failed:', error);
        return response.status(500).json({ message: 'No se pudo cargar el resumen financiero' });
      }
    };
  }
}
