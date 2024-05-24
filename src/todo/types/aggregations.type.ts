import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick aggretation' })
export class AggretationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int, { deprecationReason: 'Use completed instead' })
  totalTodosCompleted: number;
}
