import React, { CSSProperties } from 'react';
import { Input as AntdInput } from 'antd';
import styles from './InputPassword.module.scss';

interface InputPasswordProps {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  helperText?: string | null | undefined;
  status?: '' | 'warning' | 'error' | undefined;
  style?: CSSProperties;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ helperText, ...rest }) => (
  <div className={styles.inputContainer}>
    <AntdInput.Password {...rest} />
    {!!helperText && <p className={styles.helperText}>{helperText}</p>}
  </div>
);
