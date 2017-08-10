<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Service\FetchResource\Result;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FetchResourceService
{
    public function fetchResource(string $url): Result
    {
        list($ch, $result) = $this->curl($url);

        if($result === false) {
            $errorCode = curl_errno( $ch );
            $errorMessage = curl_error( $ch );

            throw new NotFoundHttpException(sprintf('Page not found (CURL: %s: %s)', $errorCode, $errorMessage));
        }

        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $body = substr($result, $header_size);

        return new Result($url, $body, curl_getinfo($ch, CURLINFO_CONTENT_TYPE));
    }

    private function curl($url)
    {
        $this->validateURL($url);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->convertURLToPunycode($url));
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
        curl_setopt($ch, CURLOPT_UPLOAD, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT)");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: text/html, application/xhtml+xml, image/png, image/jpeg, image/gif'
        ]);

        // limit download data
        curl_setopt($ch, CURLOPT_BUFFERSIZE, 500); // more progress info
        curl_setopt($ch, CURLOPT_NOPROGRESS, false);
        curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, function(
            $DownloadSize, $Downloaded
        ){
            // If $Downloaded exceeds 4000 KB, returning non-0 breaks the connection!
            return ($Downloaded > (4 *1024* 1024)) ? 1 : 0;
        });

        $result = curl_exec($ch) ;

        $ContentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

        if(preg_match('#charset=(.*)#', $ContentType, $m)) {
            try {
                $result = mb_convert_encoding($result, 'utf-8', $m[1]);
            }catch (\Error|\Exception $e) {}
        }

        return [$ch, $result];
    }

    private function convertURLToPunycode(string $url)
    {
        $urlFragments = parse_url($url);

        $protocol = $urlFragments['scheme'] ?? 'http';
        $host = \idn_to_ascii($urlFragments['host']);
        $path = $urlFragments['path'] ?? null;
        $query = $urlFragments['query'] ?? null;
        $fragment = $urlFragments['fragment'] ?? null;

        $result = $protocol .'://'. $host;

        if($path) {
            $result .= $path;
        }

        if($query) {
            $result .= '?'.$query;
        }

        if($fragment) {
            $result .= '#'.$fragment;
        }

        return $result;
    }


    private function validateURL($url)
    {
        if(! strlen($url)) {
            throw new \HttpUrlException("URL is empty");
        }

        $urlParts = parse_url($url);

        if(! $urlParts) {
            throw new \HttpUrlException(sprintf('URL `%s` cannot be parsed', $url));
        }

        $restricted = [
            '127.0.0.1',
            '0.0.0.0',
            '255.255.255.0',
            '255.255.255.252',
            'localhost',
        ];

        if(isset($_SERVER) && isset($_SERVER['SERVER_NAME'])) {
            $restricted[] = $_SERVER['SERVER_NAME'];
        }

        if(in_array($urlParts['host'], $restricted)) {
            throw new \HttpUrlException(sprintf('URL `%s` is restricted', $restricted));
        }
    }
}