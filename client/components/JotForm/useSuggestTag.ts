import { useMantineTheme } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { ChangeEventHandler, RefObject, useState } from 'react';

import type { Tag } from '../../generated/proto/jot/v1/jot_pb';
import { getTagColor } from '../../lib/getTagColor';
import { useTags } from '../../lib/listTags';

export function useSuggestTag(inputRef: RefObject<HTMLInputElement | null>) {
  const { colors } = useMantineTheme();
  const [inputValue, setInputValue] = useState('');
  const [tagName, ...rest] = inputValue.split(' ');
  const { data: tags } = useTags();
  let matchingTag: Tag | undefined;
  let suggestedTag: Tag | undefined;

  if (rest.length) {
    matchingTag = tags?.tags.find(({ name }) => name === tagName);
  } else if (tagName.length) {
    suggestedTag = tags?.tags.find(({ name }) => name.startsWith(tagName));
  }

  const matchedTag = matchingTag ?? suggestedTag;
  const tagColor = matchedTag ? getTagColor(matchedTag) : colors.blue[6];
  const suggestionText = suggestedTag?.name
    .slice(inputValue.length)
    .padStart(suggestedTag.name.length, ' ');

  const reset = () => {
    setInputValue('');
  };

  const maybeAcceptSuggestion = () => {
    if (!suggestedTag || inputValue.length >= suggestedTag.name.length) {
      return;
    }

    setInputValue(`${suggestedTag.name} `);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const onKeyDown = getHotkeyHandler([
    [
      'Escape',
      () => {
        reset();
        inputRef.current?.blur();
      },
    ],
    ['Tab', maybeAcceptSuggestion],
  ]);

  return {
    inputValue,
    matchedTag,
    suggestionText,
    tagColor,
    reset,
    inputEventHandlers: {
      onChange,
      onKeyDown,
      onTouchEnd: maybeAcceptSuggestion,
    },
  };
}
