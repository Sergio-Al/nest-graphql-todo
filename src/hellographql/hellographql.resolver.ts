import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HellographqlResolver {
  @Query(() => String, {
    description: 'It returns hello graphql',
    name: 'hello',
  })
  helloGraphQL(): string {
    return 'Hello graphQL';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomNumberFromZeroTo' })
  getRandomFromZeroTo(): number {
    return Math.floor(Math.random() * 10);
  }

  @Query(() => Int, {
    name: 'randomNumberFromZeroToNum',
    description:
      'Get a random number from zero to your desired argument (Default 6)',
  })
  getRandomFromZeroToNum(
    @Args('to', { nullable: true, type: () => Int, defaultValue: 6 })
    to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
