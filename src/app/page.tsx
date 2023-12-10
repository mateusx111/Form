"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import axios from "axios";

//Schema
const createUserFormSchema = z.object({
  name: z.string().min(5, "Nome obrigatório"),
  cpf: z.string().max(11, "O CPF é obrigatório"),
  birth: z.date().max(new Date(), {
    message: "Você precisa ter mais de 18 anos para continuar",
  }),
  contact: z.string().nonempty("Contato obrigatório"),
  address: z.object({
    zipCode: z.string().min(9, "CEP obrigatório"),
    state: z.string().min(1, "Selecione o Estado"),
    city: z.string().min(1, "Selecione a Cidade"),
    street: z.string().min(1, "Informe a Rua"),
    district: z.string().min(1, "Informe o Bairro"),
    number: z.string().min(1, "Informe o Número da Casa").max(40),
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
    <main className="flex flex-col items-center justify-center text-custom-white-100 bg-custom-bg-100">
      <div className="flex flex-col items-center justify-center w-[760px] mt-[52px] mb-[124px]">
        <form
          onSubmit={handleSubmit(createUser)}
          className=" bg-white flex flex-col gap-8 rounded px-[98px] pt-11 pb-[57px]"
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
            <label className="text-xs font-semibold">CPF</label>
            <input
              type="number"
              placeholder="000.000.000-00"
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
              placeholder="(67) 99999-9999"
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
              placeholder="Maria Eduarda"
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
              placeholder="00000-000"
              className="input-style"
              {...register("address.zipCode")}
            />
            {errors.address?.zipCode && (
              <span className="span-error">
                {errors.address?.zipCode?.message}!
              </span>
            )}
          </div>

          <div className="input-area ">
            <label className="text-xs font-semibold">Estado</label>
            <select
              id="state"
              className="input-style"
              {...register("address.state")}
            >
              <option value="">Selecione o seu Estado</option>
            </select>
            {errors.address?.state && (
              <span className="span-error">
                {errors.address?.state?.message}!
              </span>
            )}
          </div>

          <div className="input-area ">
            <label className="text-xs font-semibold">Cidade</label>
            <select
              id="city"
              className="input-style"
              {...register("address.city")}
            >
              <option value="">Selecione a sua Cidade</option>
            </select>
            {errors.address?.city && (
              <span className="span-error">
                {errors.address?.city?.message}!
              </span>
            )}
          </div>

          <div className="input-area">
            <label className="text-xs font-semibold ">Endereço</label>
            <input
              type="text"
              placeholder="Av."
              className="input-style"
              {...register("address.street")}
            />

            {errors.address?.street && (
              <span className="span-error">
                {errors.address?.street?.message}!
              </span>
            )}
          </div>

          <div className="input-area">
            <label className="text-xs font-semibold ">Bairro</label>
            <input
              type="text"
              placeholder="Vila Nova"
              className="input-style"
              {...register("address.district")}
            />

            {errors.address?.district && (
              <span className="span-error">
                {errors.address?.district?.message}!
              </span>
            )}
          </div>

          <div className="input-area">
            <label className="text-xs font-semibold ">Número</label>
            <input
              type="text"
              placeholder="7777"
              className="input-style"
              {...register("address.number")}
            />

            {errors.address?.number && (
              <span className="span-error">
                {errors.address?.number?.message}!
              </span>
            )}
          </div>

          <div className="input-area">
            <label className="text-xs font-semibold ">Complemento</label>
            <input
              type="text"
              placeholder="Opcional"
              className="input-style"
              {...register("address.complement")}
            />
          </div>

          <div className="input-area">
            <label className="text-xs font-semibold ">E-mail</label>
            <input
              type="text"
              placeholder="@gmail.com.br"
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
            className="bg-custom-purple-200 rounded-lg font-noto font-normal p-4 text-white"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
