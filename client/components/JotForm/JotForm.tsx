import { Input } from '@mantine/core';
import { useFocusWithin, useHotkeys } from '@mantine/hooks';
import { IconHash, IconPlus } from '@tabler/icons-react';
import { FormEvent, useRef } from 'react';

import type { Jot } from '../../generated/proto/jot/v1/jot_pb';
import { useStyles } from './styles';
import { useSuggestTag } from './useSuggestTag';

type Props = {
  onCreate: (tagName: string, content: Jot['content']) => Promise<void>;
};

export function JotForm({ onCreate }: Props) {
  const { classes } = useStyles();
  const { ref: wrapperRef, focused } = useFocusWithin();
  const inputRef = useRef<HTMLInputElement>(null);
  const focus = () => inputRef.current?.focus();
  const {
    inputValue,
    matchedTag,
    suggestionText,
    tagColor,
    reset,
    inputEventHandlers,
  } = useSuggestTag(inputRef);
  const PrefixIcon = !inputValue.length || matchedTag ? IconHash : IconPlus;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [tagName, ...content] = inputValue.split(' ');

    onCreate(tagName, content.join(' '))
      .then(() => {
        reset();
      })
      .catch((err: unknown) => {
        console.error('this error will propagate up, no need to toast', err);
      });
  };

  useHotkeys([
    ['shift+Digit3', focus],
    ['i', focus],
    ['shift+i', focus],
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <div ref={wrapperRef} className={classes.wrapper}>
        <Input
          ref={inputRef}
          variant="unstyled"
          leftSection={<PrefixIcon size={16} />}
          type="text"
          autoComplete="off"
          value={inputValue}
          placeholder={focused ? 'tag content' : undefined}
          styles={{
            input: {
              color: tagColor,
            },
          }}
          classNames={{
            input: classes.input,
            wrapper: classes.inputWrapper,
          }}
          {...inputEventHandlers}
        />
        <div className={classes.completion}>{suggestionText}</div>
      </div>
    </form>
  );
}
