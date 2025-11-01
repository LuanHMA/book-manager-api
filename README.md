## Estrutura de Pastas
```
├─ src
│  ├─ @types
│  │  └─ books.ts
│  ├─ config
│  │  └─ database.ts
│  ├─ controllers 
│  │  └─ books-controller.ts
│  ├─ errors 
│  │  ├─ domain-errors.ts
│  │  └─ globalErrorHandler.ts
│  ├─ models
│  │  └─ books-model.ts
│  ├─ repositories  ()
│  │  └─ books-repository.ts
│  ├─ routes
│  │  └─ books-routes.ts
│  ├─ server.ts  
│  └─ services 
│     └─ books-service.ts

```

## Funções
- server.ts → Responsável por iniciar o servidor.
- /@types → Tipagens em geral.
- /config → Lida com a conexão com o banco de dados.
- /controllers → Lida com a requisição e resposta.
- /errors → Lida com os erros das requisições de forma global.
- /models → Interfaces com as entidades do banco de dados.
- /repositories → Lida com a comunicação com o banco de dados.
- /routes → Define as rotas da api e associa cada um a um controller.
- /services → Define as regras de negócio (sem depender de HTTP).

