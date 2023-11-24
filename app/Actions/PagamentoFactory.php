<?php

namespace App\Actions;

interface PagamentoFactory
{
    public function pagamento();

    public function getNotification(string $notificationCode);
}
