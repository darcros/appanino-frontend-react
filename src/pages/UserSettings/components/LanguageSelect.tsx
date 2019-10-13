import React from 'react';
import { OutlinedSelect } from '../../../components/OutlinedSelect';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../../i18n';

export const LanguageSelect: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <OutlinedSelect
      inputName="language-select"
      label={t('page.user-settings.language')}
      defaultValue={i18n.language}
      onChange={e => {
        i18n.changeLanguage(e.target.value as string);
      }}
    >
      {supportedLanguages.map((lang, i) => (
        <option key={i} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </OutlinedSelect>
  );
};
