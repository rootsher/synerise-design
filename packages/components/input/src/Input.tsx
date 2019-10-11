import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import './style/index.less';
import * as S from './Input.styles';

interface Props {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  counterLimit?: number;
  icon1?: React.ReactElement;
  icon2?: React.ReactElement;
}

type EnhancedProps = Props & (InputProps | TextAreaProps);

const enhancedInput = <P extends object>(WrappedComponent, { type }): React.ComponentType<P & EnhancedProps> => ({
  errorText,
  label,
  description,
  counterLimit,
  icon1,
  icon2,
  ...antdInputProps
}): React.ReactElement => {
  const [value, setValue] = React.useState<string>('');
  const [charCount, setCharCount] = React.useState<number>(0);

  const showError = Boolean(errorText);
  const id = uuid();

  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value: newValue } = e.currentTarget;

      if (newValue.length > counterLimit) return;

      if (!antdInputProps.value) {
        setValue(newValue);
        setCharCount(newValue.length);
      }

      antdInputProps.onChange && antdInputProps.onChange(e);
    },
    [antdInputProps, counterLimit]
  );

  const handleIconsClick = React.useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  React.useEffect(() => {
    if (!antdInputProps.value) return;
    setValue(antdInputProps.value.toString());
    setCharCount(antdInputProps.value.toString().length);
  }, [antdInputProps.value]);

  return (
    <>
      {(label || counterLimit) && (
        <S.ContentAbove>
          <S.Label htmlFor={id}>{label}</S.Label>
          {counterLimit && (
            <S.Counter data-testid="counter">
              {charCount}/{counterLimit}
            </S.Counter>
          )}
        </S.ContentAbove>
      )}
      <S.InputWrapper>
        <S.IconsWrapper onClick={handleIconsClick} disabled={antdInputProps.disabled}>
          <S.IconsFlexContainer type={type}>
            {icon1 &&
              React.cloneElement(icon1, { className: 'icon icon1', ...(icon2 && { style: { marginRight: '4px' } }) })}
            {icon2 && React.cloneElement(icon2, { className: 'icon icon2' })}
          </S.IconsFlexContainer>
        </S.IconsWrapper>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdInputProps}
          error={showError}
          onChange={handleChange}
          value={value}
          id={id}
          ref={inputRef}
        />
      </S.InputWrapper>
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};

export const TextArea = enhancedInput(S.AntdTextArea, { type: 'textArea' });
export const Input = enhancedInput(S.AntdInput, { type: 'input' });
