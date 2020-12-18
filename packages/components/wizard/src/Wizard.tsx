import * as React from 'react';
import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header/dist/PageHeader';
import { ArrowLeftCircleM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import * as S from './Wizard.styles';
import { WizardProps, WizardSubComponent } from './Wizard.types';
import WizardOnModal from './onModal/onModal';

const Wizard: React.FC<WizardProps> & WizardSubComponent = ({
  stepper,
  contentWidth,
  headerAction,
  footer,
  title,
  onClose,
  children,
  onPrevStep,
  onNextStep,
  texts,
  visible,
}) => {
  const intl = useIntl();
  return visible ? (
    <S.WizardWrapper>
      <Layout
        fullPage
        header={
          <PageHeader
            title={title}
            onClose={onClose}
            rightSide={
              <S.WizardHeader>
                <S.WizardStepper>{stepper}</S.WizardStepper>
                <S.WizardHeaderAction>{headerAction}</S.WizardHeaderAction>
              </S.WizardHeader>
            }
          />
        }
      >
        <S.WizardContainer withFooter={Boolean(footer)}>
          <S.WizardContent contentWidth={contentWidth}>
            {children}
            <S.WizardButtons>
              {onPrevStep && (
                <Button mode="icon-label" type="ghost" onClick={onPrevStep}>
                  <Icon component={<ArrowLeftCircleM />} />{' '}
                  {texts?.prevButtonLabel ||
                    intl.formatMessage({ id: 'DS.WIZARD.PREV-BUTTON', defaultMessage: 'Back' })}
                </Button>
              )}
              {onNextStep && (
                <Button type="primary" onClick={onNextStep}>
                  {texts?.nextButtonLabel ||
                    intl.formatMessage({ id: 'DS.WIZARD.NEXT-BUTTON', defaultMessage: 'Next step' })}
                </Button>
              )}
            </S.WizardButtons>
          </S.WizardContent>
        </S.WizardContainer>
        {footer && <S.WizardFooter>{footer}</S.WizardFooter>}
      </Layout>
    </S.WizardWrapper>
  ) : null;
};

Wizard.OnModal = WizardOnModal;

export default Wizard;
