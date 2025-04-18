/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { runCode as executeCode } from '@/app/api/jdoodle/post/route';
import debounce from 'lodash/debounce';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type CodeEditorProps = {
  onRun?: (output: string, code: string) => void;
  onCodeChange?: (code: string) => void;
};

export default function CodeRunner({ onRun, onCodeChange }: CodeEditorProps) {
  const [language, setLanguage] = useState<'python' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState<string>({
    python: `print("Hello, Python!")`,
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Java!\");\n  }\n}`,
    cpp: `#include <iostream>\nint main() {\n  std::cout << \"Hello, C++!\" << std::endl;\n  return 0;\n}`
  }[language]);
  const [output, setOutput] = useState<string>('');

  // Keep a ref to the latest onCodeChange prop
  const onCodeChangeRef = useRef(onCodeChange);
  useEffect(() => {
    onCodeChangeRef.current = onCodeChange;
  }, [onCodeChange]);

  // Create debounce only once
  const debouncedCodeChange = useMemo(
    () =>
      debounce((newCode: string) => {
        onCodeChangeRef.current?.(newCode);
      }, 2000),
    []
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedCodeChange.cancel();
    };
  }, [debouncedCodeChange]);

  const handleLangChange = (lang: typeof language) => {
    setLanguage(lang);
    setCode({
      python: `print("Hello, Python!")`,
      java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Java!\");\n  }\n}`,
      cpp: `#include <iostream>\nint main() {\n  std::cout << \"Hello, C++!\" << std::endl;\n  return 0;\n}`
    }[lang]);
    setOutput('');
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    debouncedCodeChange(newCode);
  };

  const handleRun = async () => {
    // Flush any pending debounce before running
    debouncedCodeChange.flush();
    setOutput('Running…');
    try {
      const { stdout, stderr } = await executeCode({ language, code });
      const combined = `${stdout || ''}${stderr ? `\n${stderr}` : ''}`;
      setOutput(combined);
      onRun?.(combined, code);
    } catch (err) {
      setOutput('Error running code.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 p-2 bg-dark-400">
        <select
          value={language}
          onChange={e => handleLangChange(e.target.value as any)}
          className="p-1 border rounded"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button
          onClick={handleRun}
          className="px-3 py-1 bg-primary-100 text-black rounded"
        >
          Run
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="calc(100% - 60px)"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          onChange={code => handleCodeChange(code || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
        <div className="h-[60px] px-2 py-1 bg-dark-400 border-t text-sm overflow-x-hidden text-white">
          {output ? output : 'Output...'}
        </div>
      </div>
    </div>
  );
}
