# Documentação da API

## /register

### Body

```json
{
    "cpf": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "gender": "string",
    "description": "string",
    "avatarUrl": "string",
    "specialty": "string",
    "phoneNumber": "string",
    "cpfPhotoUrl": "string",
    "cpfSelfiePhotoUrl": "string",
    "recaptchaToken": "string"
}
```

### Descrição

Envia um pedido de registro para a API do prestador com cpf igual ao passado no body. Os dados são salvos e é enviado um e-mail para os donos da aplicação, o email mostra os dados do prestador para que o registro possa ser aceito ou rejeitado;

## /register/accept

### Body

```json
{
    "cpf": "string"
}
```

### Descrição

Aceita o pedido de registro do prestador com cpf igual ao passado no body. Após receber uma requisição a rota procura o prestador com o cpf na base de dados e troca o valor da coluna profileApproved para true e notifica o prestador via e-mail, dizendo que o registro dele foi aprovado;

## /register/reject

### Body

```json
{
    "cpf": "string"
}
```

### Descrição 

Rejeita o pedido de registro do prestador com cpf igual ao passado no body. Após receber uma requisição a rota procura o prestador com o cpf na base de dados e o delete, após isso, notifica o prestador via e-mail, dizendo que o registro dele foi rejeitado;