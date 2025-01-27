import 'reflect-metadata';
import dataSource from './ormconfig'; // Verifique o caminho correto

// Inicialize a conexão usando o DataSource
dataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Error during Data Source initialization', error.message);
    } else {
      console.error('Error during Data Source initialization', error);
    }
  });

export { dataSource };
