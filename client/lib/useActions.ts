import { type Jot } from '../generated/proto/jot/v1/jot_pb';
import { isUrl } from './isUrl';
import { useShowErrorToast } from './showErrorToast';
import { useShowSuccessToast } from './showSuccessToast';
import { useUpdateJot } from './updateJot';

export function useActions(jot: Jot | null) {
  const showSuccessToast = useShowSuccessToast();
  const showErrorToast = useShowErrorToast();
  const updateJot = useUpdateJot();

  const openUrl = () => {
    if (!jot || !isUrl(jot.content)) {
      return;
    }

    window.open(jot.content, '_blank');
  };

  const copyContent = () => {
    if (!jot) {
      return;
    }

    navigator.clipboard
      .writeText(jot.content)
      .then(() => showSuccessToast('copied to clipboard'))
      .catch(() =>
        showErrorToast(
          'failed to copy to clipboard',
          'do we have clipboard permissions?',
        ),
      );
  };

  const togglePin = () => {
    if (!jot) {
      return;
    }

    updateJot.mutate({
      jotId: jot.jotId,
      pinned: !jot.pinned,
      deleted: jot.deleted,
    });
  };

  const deleteJot = () => {
    if (!jot) {
      return;
    }

    updateJot.mutate({
      jotId: jot.jotId,
      pinned: jot.pinned,
      deleted: true,
    });
  };

  return { openUrl, copyContent, togglePin, deleteJot };
}
