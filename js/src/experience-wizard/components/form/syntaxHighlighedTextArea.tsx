import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

interface SyntaxHighlightedTextAreaProps {
  value: string;
  onChange?: (value: string) => void;
}

export const JSONInputWithHighlighting: React.FC<
  SyntaxHighlightedTextAreaProps
> = ({ value, onChange }) => {
  const [codeString, setCodeString] = React.useState(value);
  const onInputChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setCodeString(val);
  }, []);
  return (
    <CodeMirror
      value={codeString}
      height="600px"
      extensions={[javascript({ jsx: true })]}
      onChange={onInputChange}
    />
  );
};
