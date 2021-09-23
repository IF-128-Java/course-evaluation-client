import {UsersFeedbacksChartDto} from "./users-feedbacks-chart-dto.model";

export class ComplexChartDto {
  x: string;
  y: number;
  color: any;
  quarters: UsersFeedbacksChartDto;
}
