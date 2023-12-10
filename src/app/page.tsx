"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import axios from "axios";

//Schema
const createUserFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().max(11),
  birth: z.date().max(new Date(), {
    message: "Você precisa ter mais de 18 anos para continuar",
  }),
  contact: z.string().nonempty("Contato obrigatório"),
  address: z.object({
    zipCode: z.string().min(8, "CEP obrigatório"),
    state: z.string().max(2, "Selecione o Estado"),
    city: z.string().min(1, "Selecione a Cidade"),
    street: z.string().min(1, "Informe a Rua"),
    district: z.string().min(1, "Informe o Bairro"),
    number: z.string().min(9, "Informe o Número da Casa").max(40),
    complement: z.string(),
  }),
  email: z.string().min(1, "Email obrigatório").email("Email inválido"),
  password: z.string().min(10, "A senha precisa ter no mínimo 10 caracteres"),
});

type userFormData = z.infer<typeof createUserFormSchema>;

export default function Form() {
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userFormData>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      cpf: "",
      birth: new Date(),
      contact: "",
      address: {
        zipCode: "",
        state: "",
        city: "",
        street: "",
        district: "",
        number: "",
        complement: "",
      },
      email: "",
      password: "",
    },
  });

  const createUser = (data: any) => {
    console.log(data);
  };

  const handleFetchAdress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(
      `http://viacep.com.br/ws/${zipCode}/json/`
    );
  }, []);

  return (
    <main className="flex h-full flex-col items-center text-custom-white-100 justify-center bg-white">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col h-full mt-24 gap-8 w-full max-w-[564px]"
      >
        <div className="input-area">
          <label className="text-xs font-semibold">Nome Completo</label>
          <input
            type="text"
            placeholder="Cauê Ian Benedito Araújo"
            className="input-style"
            {...register("name")}
          />
          {errors.name && (
            <span className="span-error">{errors.name.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">CPF</label>
          <input
            type="number"
            placeholder="898.811.514-73"
            className="input-style"
            {...register("cpf")}
          />
          {errors.cpf && (
            <span className="span-error">{errors.cpf.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">Data de Nascimento</label>
          <input
            type="number"
            placeholder="04/08/2006"
            className="input-style"
            {...register("birth")}
          />
          {errors.birth && (
            <span className="span-error">{errors.birth.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">Contato</label>
          <input
            type="number"
            placeholder="(67) 98951-8118"
            className="input-style"
            {...register("contact")}
          />
          {errors.contact && (
            <span className="span-error">{errors.contact.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">Nome da mãe</label>
          <input
            type="text"
            placeholder="Josefa Isabela"
            className="input-style"
            {...register("name")}
          />
          {errors.name && (
            <span className="span-error">{errors.name.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">CEP</label>
          <input
            type="text"
            placeholder="79105-568"
            className="input-style"
            {...register("address.zipCode")}
          />
          {errors.address && (
            <span className="span-error">{errors.address.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">E-mail</label>
          <input
            type="text"
            placeholder="caue_ian_araujo@sobraer.com.br"
            className="input-style"
            {...register("email")}
          />

          {errors.email && (
            <span className="span-error">{errors.email.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">Senha</label>
          <input
            type="password"
            placeholder="********"
            className="input-style"
            {...register("password")}
          />

          {errors.password && (
            <span className="span-error">{errors.password.message}!</span>
          )}
        </div>

        <div className="input-area">
          <label className="text-xs font-semibold ">Confirmar senha</label>
          <input
            type="password"
            placeholder="********"
            className="input-style"
            {...register("password")}
          />
          {errors.password && (
            <span className="span-error">{errors.password.message}!</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-custom-purple-200 rounded-lg font-noto font-normal p-4 text-white mb-24"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
