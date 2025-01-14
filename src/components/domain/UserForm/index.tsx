import { Loader, TextButton, UserInput } from '@compound';
import useForm from '@hooks/useForm';
import type { ReactElement } from 'react';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { StyledForm } from './styled';
import type { UserFormProps } from './types';
import { validateUser } from '@utils/lib/userValidator';
import type { IUserForm } from '@models';
import {
  BUTTON_TYPE,
  TEXT_BUTTON_TYPE,
  USERFORM_TYPES,
  USER_INPUT_TYPE
} from '@constants';

const UserForm = ({
  type = USERFORM_TYPES.REGISTER,
  initialValues = {
    nickname: null,
    gender: null,
    age: null,
    mbti: null
  },
  onValidatedValuesChanged,
  onSubmit,
  ...props
}: UserFormProps): ReactElement => {
  const { values, errors, isLoading, handleChange, handleSubmit } =
    useForm<IUserForm>({
      initialValues,
      validateOnChange: true,
      validateOnInitial: type === USERFORM_TYPES.EDIT_PROFILE ? true : false,
      onSubmit,
      validateFn: validateUser
    });
  const [nicknameChecked, setNicknameChecked] = useState(
    type === USERFORM_TYPES.EDIT_PROFILE ? true : false
  );
  const isValuedChanged = useMemo(
    () =>
      !!(Object.keys(initialValues) as (keyof Partial<IUserForm>)[]).find(
        (value) => initialValues[value] !== values[value]
      ),
    [initialValues, values]
  );

  const validatedValues = useMemo(
    () =>
      Object.values(values).filter((value, index) => {
        if (Object.keys(values)[index] === 'nickname' && !nicknameChecked)
          return true;
        return value;
      }).length - Object.keys(errors).length,
    [values, errors, nicknameChecked]
  );

  const isValuesAllValidated = useMemo(
    () =>
      Object.keys(initialValues).length - validatedValues === 0 &&
      nicknameChecked,
    [initialValues, validatedValues, nicknameChecked]
  );

  const handleNickNameChecked = useCallback((value: boolean) => {
    setNicknameChecked(value);
  }, []);

  useEffect(() => {
    onValidatedValuesChanged?.(validatedValues);
  }, [validatedValues, onValidatedValuesChanged]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <StyledForm onSubmit={handleSubmit} {...props}>
      <UserInput
        errorMessage={errors.nickname}
        formType={type}
        initialNicknameValidated={nicknameChecked}
        inputType={USER_INPUT_TYPE.NICKNAME}
        value={values.nickname || ''}
        onChange={handleChange}
        onNicknameChecked={handleNickNameChecked}
      />
      <UserInput
        errorMessage={errors.gender}
        formType={type}
        inputType={USER_INPUT_TYPE.GENDER}
        value={values.gender || ''}
        onChange={handleChange}
      />

      <UserInput
        errorMessage={errors.age}
        formType={type}
        inputType={USER_INPUT_TYPE.AGE}
        value={values.age || ''}
        onChange={handleChange}
      />

      <UserInput
        errorMessage={errors.mbti}
        formType={type}
        inputType={USER_INPUT_TYPE.MBTI}
        value={values.mbti || ''}
        onChange={handleChange}
      />
      <TextButton
        buttonType={TEXT_BUTTON_TYPE.LONG_PINK}
        disabled={!isValuesAllValidated || !isValuedChanged}
        type={BUTTON_TYPE.SUBMIT}
      >
        {type === USERFORM_TYPES.REGISTER ? '회원가입' : '수정하기'}
      </TextButton>
    </StyledForm>
  );
};

export default UserForm;
