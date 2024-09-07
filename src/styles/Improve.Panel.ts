import styled from 'styled-components';

export const ScoreText = styled.h1`
  font-size: 48px;
  text-align: center;
  margin: 0;
`;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;
`;

interface ProgressIndicatorProps {
    score?: number;
}

export const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  width: 100%;
  height: 16px;
  background: linear-gradient(to right, #e74c3c, #f8c471, #28a745);
  border-radius: 8px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: ${(props) => props.score ? props.score : 0}%;
    transform: translateX(-50%);

    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid black;
  }
`;

export const ProgressLabel = styled.p`
  font-size: 12px;
  text-align: center;
`;

export const InsightItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProgressCircle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(#3498db 99%, #e0e0e0 0%);
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  color: #fff;
`;