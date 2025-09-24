
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersModule } from './trainers/trainers.module';
import { TeamsModule } from './teams/teams.module';
import { TeamPokemonModule } from './team-pokemon/team-pokemon.module';
import { PokeapiModule } from './pokeapi/pokeapi.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpass',
      database: 'pokechallenge',
      autoLoadEntities: true,
      synchronize: true, // dev only !!!!!!!!!!
    }),
    TrainersModule,
    TeamsModule,
    TeamPokemonModule,
    PokeapiModule,
  ],
})

export class AppModule {}
