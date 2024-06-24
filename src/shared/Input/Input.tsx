import React, { CSSProperties } from 'react';
import { Input as AntdInput } from 'antd';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: any;
  // onBlur?: any;
  helperText?: string | null | undefined;
  status?: '' | 'warning' | 'error' | undefined;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = ({ helperText, ...rest }) => (
  <div className={styles.inputContainer}>
    <AntdInput {...rest} />
    {!!helperText && <p className={styles.helperText}>{helperText}</p>}
  </div>
);
